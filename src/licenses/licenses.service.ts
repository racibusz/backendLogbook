import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/user.entity';
import { Repository } from 'typeorm';
import { License } from '../database/license.entity';
import { FlightsService } from '../flights/flights.service';
import { SummaryDTO } from '../flights/summaryDTO';
@Injectable()
export class LicensesService {
    constructor(
        @InjectRepository(License)
        private licensesRepository: Repository<License>,
        private readonly flightsService: FlightsService
    ) {}
    async getLicenses(userId: number){
        if(userId==undefined)
            throw NotFoundException
        const licenses = await this.licensesRepository.find({where: {user: {id: userId}}})
        await Promise.all(
        licenses.map(async (license) => {
            await Promise.all(
            license.endorsements.map(async (endorsement) => {
                let extensionStatus = [false, false, false, false];
                const yearBefore = new Date(endorsement.expirationDate);
                yearBefore.setFullYear(yearBefore.getFullYear() - 1);
                const summary = await this.flightsService.getSummaryBetween(userId,yearBefore,endorsement.expirationDate);
                if (Number(summary.total.split(':')[0]) >= 12)
                extensionStatus[0] = true;
                if(Number(summary.pic.split(':')[0])>=6)
                    extensionStatus[1] = true;
                if(Number(summary.dual.split(':')[0])>=1)
                    extensionStatus[1] = true;
                if((Number(summary.landingsDay) + Number(summary.landingsNight))>=12)
                    extensionStatus[1] = true;
                endorsement.extensionStatus = extensionStatus;
            })
            );
        })
        );

        return licenses;
    }
}
