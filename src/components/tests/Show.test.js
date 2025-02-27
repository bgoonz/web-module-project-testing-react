import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const testShow = {
    name: "Stranger Things",
    summary:"A town in the 80's thats more than it seems.",
    seasons:[
        {id:0, name:"Season 2", episodes: []}
    ]
    //add in approprate test data structure here.
}
// 1

test('renders testShow and no selected Season without errors', ()=>{
    render(<Show props = {{selectedSeason: "none", show:testShow}}/>);
});

// 2

test('renders Loading component when prop show is null', () => {
render(<Show show={null} selectedSeason={'none'} />);

    const loading = screen.getByTestId('loading-container');

    expect(loading).toBeInTheDocument();
    expect(loading).not.toBeNull();
    expect(loading).toBeTruthy();
});

// 3

test('renders same number of options seasons are passed in', ()=>{
    render(<Show show = {testShow} selectedSeason = {'none'}/>);

    const seasons = screen.getAllByTestId('season-option');
    
    expect(seasons).toHaveLength(testShow.seasons.length);
});

// 4

test('handleSelect is called when an season is selected', () => {
    const mockHandleSelect = jest.fn();
    render(<Show show = {testShow} selectedSeason = {'none'} handleSelect = {mockHandleSelect}/>);
    const select = screen.queryByLabelText('Select A Season');
    userEvent.selectOptions(select,['0']);
    expect(mockHandleSelect).toHaveBeenCalledTimes(1);
});

// 5

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {

    render(<Show show={testShow} selectedSeason={0} />);

    const yes = screen.queryByTestId('episodes-container');
    expect(yes).toBeInTheDocument();
    
    render(<Show show={testShow} selectedSeason={'none'} />);

    const no = screen.queryByTestId('episodes-container');
    expect(no).not.toBeInTheDocument();
});

//Tasks:
//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.