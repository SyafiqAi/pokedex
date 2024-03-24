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
    types: Array<{
        type: {
            name: string;
        }
    }>
    
}
