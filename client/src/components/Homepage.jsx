import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Homepage() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8500/products');
                const responseData = response.data;
                console.log(responseData);

                setProducts(responseData.Products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    return (
        <main className='w-full flex items-center flex-col p-4'>
            <div className='max-w-screen-2xl p-4 bg-slate-300 rounded flex flex-wrap gap-5'>
                {products && products.map((item) => {
                    return (
                        <Card sx={{ maxWidth: 345 }} className='min-w-[350px] p-2'>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={item.imageURL}
                                title={item.Name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.basePrice}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Add To Cart</Button>
                            </CardActions>
                        </Card>
                    )
                })}
            </div>
        </main>
    )
}

export default Homepage