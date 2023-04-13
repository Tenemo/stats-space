export const numberToBillions = (value: number): string =>
    `${(value / 1e9).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}B`;
