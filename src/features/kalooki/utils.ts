import { Player } from '@/models/player.interface';

export function hasUserName(player: Player): boolean {
  return player.userName !== undefined;
}
