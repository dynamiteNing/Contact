import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WrapTitle } from '../styles/Chat.style';
import { MySwal, Main, Wrap, WrapButton, Board, SideBar, SmallTitle, Avatar, Name, Flex, SmallName, ArtistTitle } from '../styles/Common.style';
import { FunctionButton, SingleProfile, NameSmall, Quote, Profile, SingleArtist, Tpfield, Pay, Input, Seperate, Myprofile, Buy, Mypurchase, Previous, Allsuggusted, SmallAvatar, BuyList, SingleBuy, Time, BuyName, QuoteChange, ChangeButton, Arrow } from '../styles/More.style';
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
            <WrapTitle>
              <ArtistTitle type={'rwd'}>artist</ArtistTitle>
              <BuyName>{item.artist}</BuyName>
            </WrapTitle>
            <Time>$120&emsp;{new Date(item.subcription_date).toLocaleString('en-US', options).slice(0, 12)} for 31 days</Time>
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
        <SmallName>My Profile</SmallName>
      </FunctionButton>
      <FunctionButton active={service === 'buy'} dont={(role === 1)} onClick={() => setService('buy')}>
        <Buy />
        <SmallName>Purchase</SmallName>
      </FunctionButton>
      <FunctionButton active={service === 'buy_history'} dont={(role === 1)} onClick={() => setService('buy_history')}>
        <Mypurchase />
        <SmallName>My Purchase</SmallName>
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
            <Profile key={index} onClick={() => { setPurchasetype(true); setArtist(item.name); }}>
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
  const { name, email, artist, setArtist, setPurchasetype, role, navigate } = props;

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

    setToday(new Date());
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
      <Previous onClick={() => { setArtist(''); setPurchasetype(false); }} />
      <NameSmall>{artist}</NameSmall>
      <div>NT. 120</div>
      <div>Starts from: {today.toLocaleString('en-US', options).slice(0, 12)}</div>
      <div>Duration: 31 days</div>
      <Seperate />
      <form onSubmit={(e) => handlePay(e, email, artist, name, phone, role)} method="post" id='form' >
        <div>Payment Details</div>
        <Input type='text' className='phone' pattern='[0-9]{9}' value={phone} onChange={e => setPhone(e.target.value)} placeholder="PHONE (987654321)" required/>
        <Tpfield className="tpfield" id="card-number" key="card-number" />
        <Tpfield className="tpfield" id="card-expiration-date" key="card-expiration-date" />
        <Tpfield className="tpfield" id="card-ccv" key="card-ccv" />
        <WrapButton>
          <Arrow />
          <Pay type="submit" key="submit" />
        </WrapButton>
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
    } else {
      setPurchasetype(false);
    }
  }, []);

  return (
    <>
      {
        purchasetype ? <SinglePurchase name={name} email={email} artist={artist} setArtist={setArtist} setPurchasetype={setPurchasetype} role={role} navigate={navigate} /> : <AllnotPurchased suggested={suggested} setPurchasetype={setPurchasetype} setArtist={setArtist} />
      }
    </>
  )
};

function MoreSingle(props) {
  const { service, profile, artist, setArtist, name, email, suggested, bought, role, navigate } = props;
  const [quotechange, setQuotechange] = useState('');
  const [avatarchange, setAvatarchange] = useState(0);

  useEffect(() => {
    setQuotechange(profile.quote);
    if (role === 2 && profile.avatar){
      setAvatarchange(parseInt(profile.avatar.split('_')[1].split('.')[0]));
    }
  }, [profile]);

  const postQuote = function (email, quotechange) {
    api.postQuote(email, quotechange).then((response) => {
      if (response.status === 200) {
        MySwal.fire({
          icon: 'success',
          title: `Change quote success!`,
          showConfirmButton: false,
          timer: 1000
        });
      } else if (response.status === 404) {
        MySwal.fire({
          icon: 'error',
          title: `Oops...`,
          text: 'Cannot save the quote!',
          showConfirmButton: false,
          timer: 1000,
        });
      }
      return;
    }).catch((error) => {
      console.error(error);
    });
  };

  const RecurSwal = (role, count) => {
    if (role === 1) {
      return;
    }

    return MySwal.fire({
      title: `Change Avatar`,
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: `Another`,
      confirmButtonText: 'Confirm',
      imageUrl: `../admin/images/default_${count}.png`,
      imageHeight: '30vh',
      imageWidth: '30vh',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (avatarchange !== count) {
          setAvatarchange(count);
          api.changeAvatar(email, `default_${count}.png`).then((response) => {
            if (response.status === 200) {
              MySwal.fire({
                icon: 'success',
                title: `Avatar changed!`,
                showConfirmButton: false,
                timer: 1000
              });
            } else if (response.status === 404) {
              MySwal.fire({
                icon: 'error',
                title: `Oops...`,
                text: 'Cannot change the avatar!',
                showConfirmButton: false,
                timer: 1000,
              });
            }
          }).catch((error) => {
            console.error(error);
          });
        }
        return;
      } else if (result.isDenied) {
        if (count === 11){
          return RecurSwal(role, 12);
        }
        return RecurSwal(role, (count + 1) % 12);
      }
    });
  };

  return (
    <>
      {
        service === 'buy' ? 
          <Purchase name={name} email={email} artist={artist} setArtist={setArtist} suggested={suggested} role={role} navigate={navigate} />
        : service === 'buy_history' ? 
          <BuyHistory bought={bought} />
        : 
          <SingleProfile>
            <Avatar src={role === 2 ? `../admin/images/default_${avatarchange}.png` : `../admin/images/${profile.avatar}`} alt="img" onClick={() => RecurSwal(role, avatarchange)} /> 
            <NameSmall>{profile.name}</NameSmall>
            <Flex>
              <QuoteChange type='text' className='quote' value={quotechange} onChange={e => setQuotechange(e.target.value)} />
              <ChangeButton onClick={() => postQuote(email, quotechange)} />
            </Flex>
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
      <Header role={role} name={name} email={email} type={'more'} />
      <Wrap>
        <Functions service={service} setService={setService} name={name} setProfile={setProfile} role={role} />
        <Board>
          <MoreSingle service={service} profile={profile} artist={artist} setArtist={setArtist} name={name} email={email} suggested={suggested} bought={bought} role={role} navigate={navigate} />
        </Board>
      </Wrap>
    </Main>
  )
};
