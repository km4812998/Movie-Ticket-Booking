import React, { useEffect } from 'react';
import { message } from 'antd';
import { GetMovieById } from '../../apicalls/movies';
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment';
import { GetAllTheatresByMovie } from '../../apicalls/theatres';

function TheatresForMovie() {
    // get date from query string
    const tempDate = new URLSearchParams(window.location.search).get("date");
    const [date, setDate] = React.useState(tempDate || moment().format("YYYY-MM-DD"));
    const params = useParams();
    const [theatres, setTheatres] = React.useState([]);
    const navigate = useNavigate();
    const [movie, setMovie] = React.useState([]);
    const getData = async () => {
        try {
            const response = await GetMovieById(params.id)
            if (response.success) {
                setMovie(response.data)
            }
            else {
                message.error(response.message)
            }
        }
        catch (error) {
            message.error(error.message)
        }
    }
    const getTheatres = async () => {
        try {
            const response = await GetAllTheatresByMovie({ date, movie: params.id });
            if (response.success) {
                setTheatres(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };
    useEffect(() => {
        getData()
    })

    useEffect(() => {
        getTheatres()
    }, [date]);


    return movie &&
        <div>
            <div className='bookcontent flex justify-between'>
                <div>
                    <h1 className='text-1xl '>
                        {movie.title} ({movie.language})
                    </h1>
                    <hr />
                    <h1 className='text-xl mt-1'>
                        Duration:  {movie.duration} mins
                    </h1>
                    <h1 className='text-xl'>
                        Release Date: {moment(movie.releaseDate).format('MMMM Do YYYY')}
                    </h1>
                    <h1 className='text-xl'>
                        Genre: {movie.genre}
                    </h1>
                </div>

                <div>
                    <h1 className='text-xl '>
                        Select date:
                    </h1>
                    <hr />
                    <input type='date' className='mt-1' min={moment().format("YYYY-MM-DD")}
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value)
                            navigate(`/movie/${params.id}?date=${e.target.value}`);
                        }}
                    />
                </div>
            </div>

            <div>
                <h1 className='bookcontent text-1xl mt-2'>
                    Theatres:
                </h1>
            </div>

            <div className='mt-1 flex flex-row gap-1 '>
                {theatres.map((theatre) => (
                    <div className='theatrecontent flex flex-col justify-center items-center'>
                        <h1 className='text-1xl'>{theatre.name}</h1>
                        <h1 className='text-md'>Address: {theatre.address}</h1>
                        <div className='showstime cursor-pointer'>
                            {theatre.shows.sort(
                                (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                            ).map((show) => (
                                <h1 className='text-xl'
                                onClick={() => {
                                    navigate(`/book-show/${show._id}`);
                                }}
                                >
                                    {moment(show.time, "HH:mm").format("hh:mm A")}
                                </h1>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
}

export default TheatresForMovie;