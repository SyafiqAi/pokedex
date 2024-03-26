export interface PokemonMove {
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        }
    }[],
    names: {
        language: {
            name: string;
        },
        name: string;
    }[],
    type: {
        name: string;
        url: string;
    }
}
