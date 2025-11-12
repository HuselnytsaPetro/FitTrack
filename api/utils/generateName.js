import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export function generateName() {
    const adjectives = [
        "Swift", "Mighty", "Rapid", "Fierce", "Powerful",
        "Agile", "Brave", "Dynamic", "Strong", "Energetic"
    ];

    const nouns = [
        "Runner", "Sprinter", "Champion", "Warrior", "Gladiator",
        "Striker", "Jumper", "Cyclone", "Ace", "Beast"
    ];

    const randomAdjective = faker.helpers.arrayElement(adjectives);
    const randomNoun = faker.helpers.arrayElement(nouns);

    const username = `${randomAdjective}${randomNoun}-${uuidv4().slice(0, 8)}`;
    return username;
}