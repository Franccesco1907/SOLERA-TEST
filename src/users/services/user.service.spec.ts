import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../entities/user.entity';
import { UserService } from './user.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn(async (password) => `hash:${password}`),
  compare: jest.fn(async (password, hash) => hash === `hash:${password}`),
}));

describe('UserService credentials', () => {
  const findOneBy = jest.fn();
  let service: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    findOneBy.mockResolvedValue({ fullname: 'Test User', password: 'hash:correct' });
    service = new UserService({ findOneBy } as unknown as Repository<Users>);
  });

  it('compares against the stored password hash and returns only the full name', async () => {
    await expect(service.findOne({ username: 'test', password: 'correct' }))
      .resolves.toEqual({ fullname: 'Test User' });
    expect(bcrypt.compare).toHaveBeenCalledWith('correct', 'hash:correct');
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it('rejects a wrong password', async () => {
    await expect(service.findOne({ username: 'test', password: 'wrong' }))
      .rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rejects an unknown user', async () => {
    findOneBy.mockResolvedValue(null);
    await expect(service.findOne({ username: 'missing', password: 'correct' }))
      .rejects.toBeInstanceOf(UnauthorizedException);
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it.each([{}, { username: 'test' }, { username: '', password: 'correct' }])
    ('rejects missing credentials before querying the database', async (credentials) => {
      await expect(service.findOne(credentials)).rejects.toBeInstanceOf(UnauthorizedException);
      expect(findOneBy).not.toHaveBeenCalled();
    });
});
