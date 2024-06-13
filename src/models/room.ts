type CoverImage = {
    url: string;
};

export type Image = {
    _key: string;
    url: string;
};

type Amenity = {
    _key: string,
    amenity: string;
    icon: string;
};

type Slug = {
    _type: string;
    current: string;
};

export type Room = {
    _id: string;
    coverImage: CoverImage;
    description: string;
    dimension: string;
    images: Image[];
    isOccupied: boolean;
    name: string;
    numberOfBeds: number;
    offeredAmenities: Amenity[];
    type: string;
    price: number;
    slug: Slug;
};

export type CreateRentDTO = {
    user: string;
    dormRoom: string;
    contractStartDate: string;
    contractEndDate: string;
    numberOfMonths: number;
    people: number;
    price: number;
}