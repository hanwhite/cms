
export class Contact {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public phone: string,
        public imageUrl: string,
        public group: Contact[] //stores other objects of the same type.
    ) {

    }
}