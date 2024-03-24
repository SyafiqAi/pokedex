export interface Pokemon {

    name: string;
    id: number;
    sprites: {
        other:{
            'official-artwork': {
                'front_default': string;
            }
        }
    }
    types:{
        type: {
            name: string;
        }
    }[]
    stats: {
        base_stat: number;
        stat: {
            name: string;
        }
    }[]
    
}
