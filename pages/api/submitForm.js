import { mongooseConnect } from '@/lib/mongoose';
import People from '@/models/People';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'POST') {
        const { _id, firstName, lastName, phone, email, property, unit } = req.body;

        if (!firstName || !lastName || !phone || !email || !property) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (_id) {
            try {
                const updatedPerson = await People.findByIdAndUpdate(_id, {
                    name: `${firstName} ${lastName}`,
                    phone,
                    email,
                    property,
                    unit: unit || '',
                }, { new: true });

                res.status(200).json({ message: 'Person updated successfully', updatedPerson });
            } catch (error) {
                console.error('Error updating person:', error);
                res.status(500).json({ message: 'Error updating person' });


            }
        } else {

            try {
                const newPerson = new People({
                    name: `${firstName} ${lastName}`,
                    phone,
                    email,
                    property,
                    unit: unit || '',  // Unit is optional
                    status: 'Active',   // Default status as Active (you can adjust this)
                });

                await newPerson.save();  // Save to MongoDB

                res.status(201).json({ message: 'Person added successfully', newPerson });
            } catch (error) {
                console.error('Error saving person:', error);
                res.status(500).json({ message: 'Error saving person' });
            }
        }
    } else {
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
