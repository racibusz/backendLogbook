import { Test, TestingModule } from '@nestjs/testing';
import { FlightsService } from './flights.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flight } from '../database/flight.entity';
import { Repository } from 'typeorm';
import { AirplanesService } from '../airplanes/airplanes.service';
import { CreateFlightDTO } from './createFlightDTO';

describe('FlightsService', () => {
    let service: FlightsService;
    let mockFlightsRepository;

    beforeEach(async ()=>{
        mockFlightsRepository = {
            find: jest.fn(),
        };

        const module = await Test.createTestingModule({
            providers: [FlightsService,
                {
                    provide: getRepositoryToken(Flight),
                    useValue: mockFlightsRepository,
                }
            ],
        }).compile();
        
        service = module.get<FlightsService>(FlightsService);
    })

    it("Summary", async () => {
        const flightsMock = 
        [
        {
            "id": 4,
            "userId": 0,
            "departureAerodrome": "EPZP",
            "arrivalAerodrome": "EPLU",
            "departureTime": "13:48:00",
            "arrivalTime": "14:45:00",
            "flightDate": "2025-08-10",
            "aircraft": {
                "id": 4,
                "aircraftType": {
                    "id": 1842,
                    "model": "CESSNA 152",
                    "type": "C152",
                    "category": "SEP(L)"
                },
                "registration": "SPKAK"
            },
            "SinglePilotSeTime": "00:57",
            "SinglePilotMeTime": "",
            "multiPilotTime": "",
            "totalTime": "00:57",
            "picName": "SELF",
            "landingsDay": 1,
            "landingsNight": 0,
            "flightConditionNightTime": "",
            "flightConditionIfrTime": "",
            "picTime": "00:57",
            "copilotTime": "",
            "dualTime": "",
            "instructorTime": "",
            "remarks": "XC"
        },
        {
            "id": 3,
            "userId": 0,
            "departureAerodrome": "EPZP",
            "arrivalAerodrome": "EPLS",
            "departureTime": "12:00:00",
            "arrivalTime": "12:35:00",
            "flightDate": "2025-08-09",
            "aircraft": {
                "id": 3,
                "aircraftType": {
                    "id": 6806,
                    "model": "TECNAM P-2008",
                    "type": "P208",
                    "category": "SEP(L)"
                },
                "registration": "SPKAR"
            },
            "SinglePilotSeTime": "00:35",
            "SinglePilotMeTime": "",
            "multiPilotTime": "",
            "totalTime": "00:35",
            "picName": "SELF",
            "landingsDay": 1,
            "landingsNight": 0,
            "flightConditionNightTime": "",
            "flightConditionIfrTime": "",
            "picTime": "00:35",
            "copilotTime": "",
            "dualTime": "",
            "instructorTime": "",
            "remarks": "TESTINPUT"
        },
        {
            "id": 2,
            "userId": 0,
            "departureAerodrome": "EPZP",
            "arrivalAerodrome": "EPLS",
            "departureTime": "12:00:00",
            "arrivalTime": "12:25:00",
            "flightDate": "2025-08-08",
            "aircraft": {
                "id": 1,
                "aircraftType": {
                    "id": 6806,
                    "model": "TECNAM P-2008",
                    "type": "P208",
                    "category": "SEP(L)"
                },
                "registration": "SPKAC"
            },
            "SinglePilotSeTime": "00:25",
            "SinglePilotMeTime": "",
            "multiPilotTime": "",
            "totalTime": "00:25",
            "picName": "SELF",
            "landingsDay": 1,
            "landingsNight": 0,
            "flightConditionNightTime": "",
            "flightConditionIfrTime": "",
            "picTime": "00:25",
            "copilotTime": "",
            "dualTime": "",
            "instructorTime": "",
            "remarks": "TESTINPUT"
        },
        {
            "id": 1,
            "userId": 0,
            "departureAerodrome": "EPLS",
            "arrivalAerodrome": "EPZP",
            "departureTime": "13:00:00",
            "arrivalTime": "13:45:00",
            "flightDate": "2025-08-07",
            "aircraft": {
                "id": 1,
                "aircraftType": {
                    "id": 6806,
                    "model": "TECNAM P-2008",
                    "type": "P208",
                    "category": "SEP(L)"
                },
                "registration": "SPKAC"
            },
            "SinglePilotSeTime": "00:45",
            "SinglePilotMeTime": "",
            "multiPilotTime": "",
            "totalTime": "00:45",
            "picName": "SELF",
            "landingsDay": 1,
            "landingsNight": 0,
            "flightConditionNightTime": "",
            "flightConditionIfrTime": "",
            "picTime": "00:45",
            "copilotTime": "",
            "dualTime": "",
            "instructorTime": "",
            "remarks": "XC"
        }
    ];
        mockFlightsRepository.find.mockResolvedValue(flightsMock);
        const result = await service.getSummary(1);

        console.log(result);
        expect(result.total).toBe("02:42");
        expect(result.pic).toBe("02:42");
        expect(result.landingsDay).toBe(4);
        expect(result.landingsNight).toBe(0);

    })

});