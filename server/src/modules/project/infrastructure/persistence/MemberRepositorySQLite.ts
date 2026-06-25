import { getDB } from "../../../../configs/db.js";
import type { Member } from "../../domain/entities/Member.js";
import type { MemeberRepository } from "../../domain/repositories/MemberRepository.js";

export class MemeberRepositorySQLite implements MemeberRepository {
    async findMember(memberId: number): Promise<Member[]> {
        const db = getDB();
        const member = await db.all<Member[]>(`SELECT * FROM member WHERE user = ?`, [memberId]);
        return member;
    }
}