import type { Member } from "../entities/Member.js";

export interface MemeberRepository {
    findMember(memberId: number): Promise<Member[]>;
}