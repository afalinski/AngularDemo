import {InMemoryDbService} from 'angular-in-memory-web-api'
import {ICar} from './product'

export class ProductData implements InMemoryDbService {
    createDb() {
        let products: ICar[] = [
                {
                    "id": 1,
                    "carName": "Mazda 6 GH",
                    "carCode": "GDN-0011",
                    "releaseDate": "2012",
                    "description": "Sedan",
                    "price": 11000,
                    "starRating": 3.2,
                    "imageUrl": "./assets/images/mazda6gh.png",
                    "tags": ['']
                },
                {
                    "id": 2,
                    "carName": "Ford Fusion",
                    "carCode": "GDN-0023",
                    "releaseDate": "2016",
                    "description": "Sedan",
                    "price": 15000,
                    "starRating": 4.2,
                    "imageUrl": "./assets/images/ford f.png",
                    "tags": ['']
                },
                {
                    "id": 5,
                    "carName": "Opel Astra H",
                    "carCode": "TBX-0048",
                    "releaseDate": "2005",
                    "description": "Vagon",
                    "price": 5000,
                    "starRating": 4.8,
                    "imageUrl": "./assets/images/opel-astra_2005_Universal.png",
                    "tags": ['']
                },
                {
                    "id": 8,
                    "carName": "Mazda 6 GJ",
                    "carCode": "TBX-0022",
                    "releaseDate": "2016",
                    "description": "Sedan",
                    "price": 20000,
                    "starRating": 3.7,
                    "imageUrl": "./assets/images/Mazda6GJ.png",
                    "tags": ['']
                },
                {
                    "id": 10,
                    "carName": "Opel Astra GTS",
                    "carCode": "GMG-0042",
                    "releaseDate": "2015",
                    "description": "Cupe",
                    "price": 20000,
                    "starRating": 4.6,
                    "imageUrl": "./assets/images/opel-astra_gtc_.png",
                    "tags": ['']
                }
            ];

            return { products };
    }
}
