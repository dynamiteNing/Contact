import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Main, FunctionBar, Wrap, Board, FunctionButton, SingleProfile, Name, Quote, Profile, Avatar, SingleArtist, Tpfield, Button, Input, Seperate } from '../styles/More.style';
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
      <div onClick={() => setPurchasetype(true)}>put this on each artists</div>
    </>
  )
};

function SinglePurchase(props) {
  const { name, email, artist, setPurchasetype, role, navigate } = props;

  const [TPDirect, setTPDirect] = useState();
  const [phone, setPhone] = useState('');

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
            placeholder: 'CCV',
          },
        },
        styles: {
          '.valid': {
            color: 'blue',
          },
          '.invalid': {
            color: 'red',
          },
        },
      });
      setTPDirect(res);
    });
  }, []);


   const handlePay = (e, email, artist, name, phone, role) => {
    e.preventDefault();
    TPDirect.card.getPrime(function (result) {
      const tappayStatus = TPDirect.card.getTappayFieldsStatus();

      if (tappayStatus.canGetPrime === false) {
        alert('Cannot get prime!');
      }

      if (result.status !== 0) {
        alert('getPrime error!');
      }

      const prime = result.card.prime;
      
      api.subscribe(email, artist, prime, name, phone, new Date().toLocaleString()).then((response) => {
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
        if (data) {
          window.alert(`Artist ${artist} subscription succeed!`);
          navigate(`../chat`, {state: {role: role, name: name, email: email, chatroom: artist}});
        }
      }).catch((error) => {
        console.error(error);
      })
    })
  }

  return (
    <SingleArtist>
      <div onClick={() => setPurchasetype(false)}>put this on the corner</div>
      <Name>{artist}</Name>
      <div>NT. 120</div>
      <Seperate />
      <form onSubmit={(e) => handlePay(e, email, artist, name, phone, role)} method="post" id='form' >
        <div>Payment Details</div>
        <Input type='text' className='phone' value={phone} onChange={e => setPhone(e.target.value)} placeholder="PHONE" required/>
        <Tpfield className="tpfield" id="card-number" key="card-number" />
        <Tpfield className="tpfield" id="card-expiration-date" key="card-expiration-date" />
        <Tpfield className="tpfield" id="card-ccv" key="card-ccv" />
        <Button type="submit" key="submit">Pay</Button>
      </form>
    </SingleArtist>
  )
};

function Purchase(props) {
  const { name, email, artist, setArtist, suggested, role, navigate } = props;
  const [purchasetype, setPurchasetype] = useState(false);

  useEffect(() => {
    if (artist) {
      setPurchasetype(true);
    }
  }, []);

  return (
    <>
      {
        purchasetype ? <SinglePurchase name={name} email={email} artist={artist} setPurchasetype={setPurchasetype} role={role} navigate={navigate} /> : <AllnotPurchased suggested={suggested} setPurchasetype={setPurchasetype} setArtist={setArtist} />
      }
    </>
  )
};

function MoreSingle(props) {
  const { service, profile, artist, setArtist, name, email, suggested, role, navigate } = props;

  return (
    <>
      {
        service === 'buy' ? 
          <Purchase name={name} email={email} artist={artist} setArtist={setArtist} suggested={suggested} role={role} navigate={navigate} />
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
  const navigate = useNavigate();
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
          <MoreSingle service={service} profile={profile} artist={artist} setArtist={setArtist} name={name} email={email} suggested={suggested} role={role} navigate={navigate} />
        </Board>
      </Wrap>
    </Main>
  )
};
