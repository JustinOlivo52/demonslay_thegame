// Uses the existing combat labs with a separate in-memory progression profile.
const style=new URLSearchParams(location.search).get('style');
if(style==='flame')import('./flame-lab');
else if(style==='thunder')import('./thunder-lab');
else if(style==='wind')import('./wind-lab');
else import('./water-lab');

export {};
