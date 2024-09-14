const rooms = [
    {
        id: 1,
        room_name: 'Deluxe Room',
        seats_available: 3,
        amenities: ['ac', 'tv', 'wifi'],
        price_per_hour: 300
    },
    {
        id: 2,
        room_name: 'Luxury Room',
        seats_available: 5,
        amenities: ['ac', 'tv', 'wifi', 'kitchen'],
        price_per_hour: 500
    },
    {
        id: 3,
        room_name: 'Premium Room',
        seats_available: 10,
        amenities: ['ac', 'tv', 'wifi', 'kitchen', 'parking'],
        price_per_hour: 1000
    }
]

export const getRooms = (req, res) => {
    res.status(200).json(rooms);
}

export const createRoom = (req, res) => {
    const newRoom = req.body;
    const id = rooms[rooms.length - 1].id + 1;
    newRoom.id = id;
    rooms.push(newRoom);
    res.status(201).json(newRoom);
}

export default rooms;