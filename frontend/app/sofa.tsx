
import React from 'react';
import { ComboboxComponent } from './combobox';

let messiId = 12994
let rolandoId = 750
let messiLink = `https://widgets.sofascore.com/en/embed/player/${messiId}?widgetTheme=light`
let ronaldoLink = `https://widgets.sofascore.com/en/embed/player/${rolandoId}?widgetTheme=light`


export const SofaPlayerEmbed = () => {
    return (
        <div className="max-w-[730px] w-full">
            <ComboboxComponent className="w-full mb-2" />

            <iframe
                id="sofa-player-embed-750"
                src={ronaldoLink}
                className="h-[737px] w-full"
                frameBorder="0"
                scrolling="no"
                title="Sofa Player Embed"
            />
        </div>
    );
};

export default SofaPlayerEmbed;
