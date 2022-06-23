import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Main, FunctionBar, Wrap, Board, FunctionButton, SingleProfile, Name, Quote, Profile, Avatar, SingleArtist, Tpfield } from '../styles/More.style';
import { api } from '../utils/api';

function Functions(props) {
  const { service, setService, name, setProfile } = props;

  useEffect(() => {
    getProfile(name);
  }, []);

  const getProfile = (name) => {
    api.getProfile(name).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        setProfile(data.profile);
      }
    }).catch((error) => {
      console.error(error);
    })
  };


  return (
    <FunctionBar>
      <FunctionButton active={service === 'profile'} onClick={() => setService('profile')}>My Profile</FunctionButton>
      <FunctionButton active={service === 'buy'} onClick={() => setService('buy')}>Purchase</FunctionButton>
      <FunctionButton active={service === 'buy_history'} onClick={() => setService('buy_history')}>My Purchase</FunctionButton>
    </FunctionBar>
  )
};

function AllnotPurchased(props) {
  const { suggested, setPurchasetype, setArtist } = props;

  return (
    <>
      <>
        {
          suggested.map((item, index) => (
          <Profile>
            {item}
          </Profile>
        ))
        }</>
      <div onClick={() => setPurchasetype(true)}>test</div>
    </>
  )
};

function SinglePurchase(props) {
  const { email, artist, setPurchasetype } = props;

  return (
    <>
      <>{artist} pruchase page</>
      <div onClick={() => setPurchasetype(false)}>test</div>

      <div style={{ fontWeight: 'bold', height: '30px' }}>信用卡資料</div>
      <Tpfield className="tpfield" id="card-number"></Tpfield>
      <Tpfield className="tpfield" id="card-expiration-date"></Tpfield>
      <Tpfield className="tpfield" id="card-ccv"></Tpfield>
    </>
  )
};

function Purchase(props) {
  const { email, artist, setArtist, suggested } = props;
  const [purchasetype, setPurchasetype] = useState(false);
  const [TPDirect, setTPDirect] = useState();

  const getTPD = function () {
    return new Promise((resolve, reject) => {
      const script = window.document.createElement('script');
      script.src = 'https://js.tappaysdk.com/tpdirect/v5.1.0';
      script.async = true;
      script.onload = () => {
        if (typeof window.TPDirect !== 'undefined') {
          resolve(window.TPDirect);
        } else {
          reject(new Error('TapPay sdk loading failed'));
        }
      };
      script.onerror = reject;
      window.document.body.appendChild(script);
    });
  };

  useEffect(() => {
    getTPD().then((res) => {
      res.setupSDK(
        '12348',
        'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF',
        'sandbox',
      );
      res.card.setup({
        fields: {
          number: {
            element: '#card-number',
            placeholder: '**** **** **** ****',
          },
          expirationDate: {
            element: '#card-expiration-date',
            placeholder: 'MM / YY',
          },
          ccv: {
            element: '#card-ccv',
            placeholder: '後三碼',
          },
        },
        styles: {
          '.valid': {
            color: 'green',
          },
          '.invalid': {
            color: 'red',
          },
        },
      });
      setTPDirect(res);
    });

    if (artist) {
      setPurchasetype(true);
    }
  }, []);


  return (
    <>
      {
        purchasetype ? <SinglePurchase email={email} artist={artist} setPurchasetype={setPurchasetype} /> : <AllnotPurchased suggested={suggested} setPurchasetype={setPurchasetype} setArtist={setArtist} />
      }
    </>
  )
};

function MoreSingle(props) {
  const { service, profile, artist, setArtist, email, suggested } = props;

  return (
    <>
      {
        service === 'buy' ? 
          <Purchase email={email} artist={artist} setArtist={setArtist} suggested={suggested} />
        : service === 'buy_history' ? 
          <div>buy_history</div>
        : 
          <SingleProfile>
            <Avatar src={`../admin/images/${profile.avatar}`} alt="img" /> 
            <Name>{profile.name}</Name>
            <Quote>{profile.quote}</Quote>
          </SingleProfile>
      }
    </>
  );
};

export default function More() {
  // const navigate = useNavigate();
  const { role, name, email, artistPre } = useLocation().state;

  const [service, setService] = useState('');
  const [profile, setProfile] = useState({});
  const [suggested, setSuggested] = useState([]);
  const [artist, setArtist] = useState('');

  useEffect(() => {
    if (artistPre) {
      setService('buy');
      setArtist(artistPre);
    } else {
      setService('profile');
    }

    api.getNotfriends(email).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        return {};
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        data.notfriends.map((item, index) => {
          setSuggested(suggested => [...suggested, item.artist]);
        });
      }
    }).catch((error) => {
      console.error(error);
    })
  }, []);

  return (
    <Main>
      <Wrap>
        <Functions service={service} setService={setService} name={name} setProfile={setProfile} />
        <Board>
          <MoreSingle service={service} profile={profile} artist={artist} setArtist={setArtist} email={email} suggested={suggested}  />
        </Board>
      </Wrap>
    </Main>
  )
};
