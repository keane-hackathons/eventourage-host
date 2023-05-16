import { Typography } from 'antd';
import './Home.css'
import { CollectionTile } from '../../components/CollectionTile';
import { ActionsHub } from '../../components/ActionsHub';
import { GlobalStyle } from '../../components/GlobalStyle';

function Home() {
  const { Title } = Typography;

  return (
    <GlobalStyle>
      <div className="App">
        <div className="profile-bar">
          <div>
            <Title level={2}>Hey Johnson,</Title>
            <Title style={{color: "#8592A6"}} level={3}>What shall we do?</Title>
          </div>
          <div className="profile-pic"></div>
        </div>

        <div className="shelf"></div>
        <div className="btns-container">
          <CollectionTile
            background="#B7D1FA"
            shadow="rgba(183,209,250,0.35)"
          >
            F1 Racer<br/>Collection
          </CollectionTile>
          <CollectionTile
            background="#CCEEFF"
            shadow="rgba(156,222,255,0.35)"
          >
            Heineken<br/>Silver Event
          </CollectionTile>
          <CollectionTile
            background="#F8E2A9"
            shadow="rgba(247,206,104,0.35)"
          >
            Heineken<br/>Vegaland
          </CollectionTile>
        </div>

        <ActionsHub 
          items={[
            {
              key: '1',
              label: `Happening`,
              children: <><br/><br/>Hmm... Nothing here.</>,
            },
            {
              key: '2',
              label: `Upcoming`,
              children: <><br/><br/>Hmm... Nothing here.</>,
            },
          ]}
        />
      </div>
    </GlobalStyle>
  )
}

export default Home
