import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MySwal, Main, Wrap, Board, SideBar, SmallTitle, Name } from '../styles/Common.style';
import { FunctionButton, SingleProfile, NameSmall, Quote, Profile, Avatar, SingleArtist, Tpfield, Pay, Input, Seperate, Myprofile, Buy, Mypurchase, Previous, Allsuggusted, SmallAvatar, BuyList, SingleBuy, Time, BuyName } from '../styles/More.style';
import { api } from '../utils/api';
import { options } from '../utils/date';
import Header from './components/Header';

function BuyHistory(props) {
  const { bought } = props;

  return (
    <BuyList>
      { bought.length !== 0 ?
        bought.map((item, index) => (
          <>
          <SingleBuy key={index}>
            <BuyName>{item.artist}</BuyName>
            <Time>{item.subcription_date.slice(0, 10)} ~ for 31 days</Time>
          </SingleBuy>
          <Seperate />
          </>
        ))
        :
        <Name>You have not subscribed any artist!</Name>
      }
    </BuyList>
  )
};

function Functions(props) {
  const { service, setService, name, setProfile, role } = props;

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
    <SideBar>
      <SmallTitle>More</SmallTitle>
      <FunctionButton active={service === 'profile'} onClick={() => setService('profile')}>
        <Myprofile />
        <div>My Profile</div>
      </FunctionButton>
      <FunctionButton active={service === 'buy'} dont={(role === 1)} onClick={() => setService('buy')}>
        <Buy />
        <div>Purchase</div>
      </FunctionButton>
      <FunctionButton active={service === 'buy_history'} dont={(role === 1)} onClick={() => setService('buy_history')}>
        <Mypurchase />
        <div>My Purchase</div>
      </FunctionButton>
    </SideBar>
  )
};

function AllnotPurchased(props) {
  const { suggested, setPurchasetype, setArtist } = props;

  return (
    <Allsuggusted>
        {
          suggested.map((item, index) => (
            <Profile onClick={() => { setPurchasetype(true); setArtist(item.name); }}>
              <SmallAvatar src={`../admin/images/${item.avatar}`} alt="img" /> 
              <NameSmall>{item.name}</NameSmall>
              <Quote>{item.quote}</Quote>
            </Profile>
          ))
        }
    </Allsuggusted>
  )
};

function SinglePurchase(props) {
  const { name, email, artist, setPurchasetype, role, navigate } = props;

  const [TPDirect, setTPDirect] = useState();
  const [phone, setPhone] = useState('');
  const [today, setToday] = useState('');

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

    setToday(new Date().toLocaleString('en-US', options).slice(0, 9));
  }, []);


   const handlePay = (e, email, artist, name, phone, role) => {
    e.preventDefault();
    TPDirect.card.getPrime(function (result) {
      const tappayStatus = TPDirect.card.getTappayFieldsStatus();

      if (tappayStatus.canGetPrime === false) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cannot get prime!',
        });
      }

      if (result.status !== 0) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Get prime error!',
        });
      }

      const prime = result.card.prime;
      
      api.subscribe(email, artist, prime, name, phone, today).then((response) => {
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
          MySwal.fire({
            icon: 'success',
            title: `Artist ${artist} subscription succeed!`,
            showConfirmButton: false,
            timer: 1000
          });
          navigate(`../chat`, {state: {role: role, name: name, email: email, chatroom: artist}});
        }
      }).catch((error) => {
        console.error(error);
      })
    })
  }

  return (
    <SingleArtist>
      <Previous onClick={() => setPurchasetype(false)}/>
      <NameSmall>{artist}</NameSmall>
      <div>NT. 120</div>
      <div>Starts from: {today}</div>
      <div>Duration: 31 days</div>
      <Seperate />
      <form onSubmit={(e) => handlePay(e, email, artist, name, phone, role)} method="post" id='form' >
        <div>Payment Details</div>
        <Input type='text' className='phone' value={phone} onChange={e => setPhone(e.target.value)} placeholder="PHONE" required/>
        <Tpfield className="tpfield" id="card-number" key="card-number" />
        <Tpfield className="tpfield" id="card-expiration-date" key="card-expiration-date" />
        <Tpfield className="tpfield" id="card-ccv" key="card-ccv" />
        <Pay type="submit" key="submit" />
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
  const { service, profile, artist, setArtist, name, email, suggested, bought, role, navigate } = props;

  return (
    <>
      {
        service === 'buy' ? 
          <Purchase name={name} email={email} artist={artist} setArtist={setArtist} suggested={suggested} role={role} navigate={navigate} />
        : service === 'buy_history' ? 
          <BuyHistory bought={bought} />
        : 
          <SingleProfile>
            <Avatar src={`../admin/images/${profile.avatar}`} alt="img" /> 
            <NameSmall>{profile.name}</NameSmall>
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
  const [bought, setBought] = useState([]);

  useEffect(() => {
    if (role === 1) {
      setService('profile');
    } else if (artistPre) {
      setService('buy');
      if (artistPre !== ' ') {
        setArtist(artistPre);
      }
    } else {
      setService('profile');
    }

    api.getNotfriends(email).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        return {
          data: {
              notfriends: [],
          },
        };
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        data.notfriends.map((item, index) => {
          setSuggested(suggested => [...suggested, item]);
        });
      }
    }).catch((error) => {
      console.error(error);
    })

    api.getPurchased(email).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        return {
          data: {
            purchased: [],
          },
        };
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        setBought(data.purchased);
      }
    }).catch((error) => {
      console.error(error);
    })
  }, []);

  return (
    <Main>
      <Header role={role} name={name} email={email} />
      <Wrap>
        <Functions service={service} setService={setService} name={name} setProfile={setProfile} role={role} />
        <Board>
          <MoreSingle service={service} profile={profile} artist={artist} setArtist={setArtist} name={name} email={email} suggested={suggested} bought={bought} role={role} navigate={navigate} />
        </Board>
      </Wrap>
    </Main>
  )
};
