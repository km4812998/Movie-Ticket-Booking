import React, { useEffect } from 'react';
import { Col, Row, message } from 'antd';
import { GetAllMovies } from '../../apicalls/movies';
import { useNavigate } from 'react-router-dom'
import moment from 'moment';


function Home() {
    const [searchText = "", setSearchText] = React.useState("");
    const navigate = useNavigate();
    const [movies, setMovies] = React.useState([]);
    const getData = async () => {
        try {
            const response = await GetAllMovies()
            if (response.success) {
                setMovies(response.data)
            }
            else {
                message.error(response.message)
            }
        }
        catch (error) {
            message.error(error.message)
        }
    }


    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <input type='text'
                className='search-input'
                placeholder='Search for movies'
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Row gutter={[20]}>
                {movies
                .filter((movie)=>movie.title.toLowerCase().includes(searchText.toLowerCase()))
                .map((movie) => (
                    <Col span={6}>
                        <div className='p-2 card flex flex-col gap-1 mt-2 ml-1 cursor-pointer'
                            onClick={() =>
                                navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")} `)}
                        >
                            <img src={movie.poster} alt='' height={200} className='br-2 m-1' />
                            <div className='flex gap-1 justify-center items-center'>
                                <h1 className='text-md'>
                                    {movie.title}
                                </h1>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Home;