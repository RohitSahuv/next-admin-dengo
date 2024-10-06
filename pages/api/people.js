import { mongooseConnect } from '@/lib/mongoose';  // Your MongoDB connection utility
import People from '@/models/People';  // Your MongoDB model

export default async function handler(req, res) {
    await mongooseConnect();

    const { status } = req.query;

    try {
        const query = status ? { status } : {};
        let peopleData = await People.find({});
        peopleData = peopleData.filter(people => people.status === query.status);
        res.status(200).json(peopleData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
}
