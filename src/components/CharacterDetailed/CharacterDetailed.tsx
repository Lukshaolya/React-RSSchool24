import { BASE_URL } from '../../constants';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { CharactaeDetailData, ContextType } from '../../types';
import loader from './../../assets/loader.png';
import styles from './CharacterDetailed.module.css';

const CharacterDetailed = () => {
  const [character, setCharacter] = useState<CharactaeDetailData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpenonMainPage, setIsOpenonMainPage } =
    useOutletContext<ContextType>();

  const queryParam = new URLSearchParams(location.search).get('details');
  const urlToFetch = `${BASE_URL}${queryParam}`;

  useEffect(() => {
    if (!queryParam) return;

    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const response = await fetch(urlToFetch);
        const data = await response.json();
        console.log(data);
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
      setLoading(false);
      setIsOpen(true);
    };

    fetchCharacter();
  }, [urlToFetch, queryParam]);

  const handleClickOnDetailsBlock = () => {
    setIsOpen(false);
    setIsOpenonMainPage(null);
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('details');
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  if (loading)
    return (
      <div className={styles.loader}>
        <img src={loader} alt="loader" />
      </div>
    );

  if (!character) return <div>No character found</div>;
  if (!isOpen || isOpenonMainPage == null) return <></>;
  return (
    <div className={styles.detailed_block}>
      <h3>{character.name}</h3>
      <h4>
        {character.status} / {character.species}
      </h4>

      <img
        src={character.image}
        alt={character.name}
        className={character.status === 'Dead' ? styles.filter_img : ''}
      />
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Status:</strong> {character.status}
      </p>
      <p>
        <strong>Species:</strong> {character.species}
      </p>
      <p>
        <strong>Origin:</strong> {character.origin.name}
      </p>
      <p>
        <strong>Location:</strong> {character.location.name}
      </p>
      <button onClick={handleClickOnDetailsBlock}>Close</button>
    </div>
  );
};

export default CharacterDetailed;