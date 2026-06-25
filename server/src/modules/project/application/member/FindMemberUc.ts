import type { MemeberRepository } from "../../domain/repositories/MemberRepository.js";

export class FindMemberUc {
    constructor(
        private memberRepository: MemeberRepository
    ) {}

    async exec(memberId: number) {
        return await this.memberRepository.findMember(memberId);
    }
}