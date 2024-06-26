

export const getValidNumber = (value: any, defaultValue: number) => {
    const valueNumber: number = Number(value);
    return Number.isNaN(valueNumber) || valueNumber <= 0 ? defaultValue : valueNumber
}