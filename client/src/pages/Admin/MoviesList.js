import React, { useEffect } from 'react';
import Button from '../../components/Button'
import MovieForm from './MovieForm'
import moment from 'moment'
import { Table,message } from 'antd';
import { GetAllMovies } from '../../apicalls/movies';
import { DeleteMovie } from '../../apicalls/movies';
function MoviesList() {
    const [movies, setMovies] = React.useState([]);
    const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const [formType, setFormType] = React.useState("add");

    const getData = async () =>{
        try{
            const response = await GetAllMovies()
            if(response.success){
                setMovies(response.data)
            }
            else{
                message.error(response.message)
            }
        }
        catch(error){
            message.error(error.message)
        }
    }

    const handleDelete = async (movieId) =>{
        try{
            const response = await DeleteMovie({movieId})
            if(response.success){
                message.success(response.message)
                getData()
            }
            else{
                message.error(response.message)
            }
        }
        catch(error){
            message.error(error.message)
        }
    }

    const columns = [
        {
            title: 'Poster',
            dataIndex: 'poster',
            render: (text, record) => {
                return <img src={record.poster} alt="poster" width='100' height='100' className='br-1' />
            }
        },
        {
            title: 'Name',
            dataIndex: 'title',
        },
        
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
        },
        {
            title: 'Language',
            dataIndex: 'language',
        },
        {
            title: 'Release Date',
            dataIndex: 'releasedate',
            render: (text, record) => {
                return moment(record.releaseDate).format('DD-MM-YYYY')
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return <div className="flex gap-1">
                            <i className="ri-delete-bin-fill"
                            onClick={()=>{
                                handleDelete(record._id);
                            }}
                            ></i>
                            <i className="ri-edit-2-fill"
                            onClick={()=>{
                                setSelectedMovie(record);
                                setFormType("edit");
                                setShowMovieFormModal(true);
                            }}
                            ></i>
                        </div>
            }
        }
    ]
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='text-gray'>
            <div className='flex justify-end mb-1 '>
                <Button
                    title="Add Movies"
                    // variant="outlined"
                    onClick={() => {
                        setShowMovieFormModal(true)
                        setShowMovieFormModal(true)
                        setFormType("add")
                    }}

                />
            </div>

            <Table columns={columns} dataSource={movies}/>

            {showMovieFormModal && <MovieForm
                showMovieFormModal={showMovieFormModal}
                setShowMovieFormModal={setShowMovieFormModal}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                formType={formType}
                getData={getData}
            />}
        </div>
    )
}

export default MoviesList;