'use strict';

import {Select} from '../select/select';
import '../scss/index.scss';
import '../select/select.scss';

window.addEventListener('DOMContentLoaded', () => {
    const select = new Select('#select', {
        placeholder: 'Please choose the option',
        selectedId: '4',
        data: [
            {id: '1', value: 'Angular'},
            {id: '2', value: 'React'},
            {id: '3', value: 'Vue'},
            {id: '4', value: 'React Native'},
            {id: '5', value: 'Next'},
            {id: '6', value: 'Jest'},
        ],
        onSelect(item) {
            console.log('selected item:', item);
        }
    });

    window.s = select;
});

