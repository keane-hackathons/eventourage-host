import { Typography } from 'antd';
import './Home.css'
import { CollectionTile } from '../../components/CollectionTile';
import { ActionsHub } from '../../components/ActionsHub';

function Home() {
  const { Title } = Typography;

  return (
    <div className="App">
      <div className="profile-bar">
        <Title level={2}>Your Collection</Title>
        <div className="profile-pic"></div>
      </div>

      <div className="shelf"></div>
      <div className="btns-container">
        <CollectionTile
          background="#B7D1FA"
          shadow="rgba(183,209,250,0.35)"
          title="F1 Racer Collection"
          path="f1-racer"
        >
          F1 Racer<br/>Collection
        </CollectionTile>
        <CollectionTile
          background="#CCEEFF"
          shadow="rgba(156,222,255,0.35)"
          title="Heineken Silver Event"
        >
          Heineken<br/>Silver Event
        </CollectionTile>
        <CollectionTile
          background="#F8E2A9"
          shadow="rgba(247,206,104,0.35)"
          title="Heineken Vegaland"
          path="among-us"
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
            children: <><br/><br/>Hmm... Nothing here too.</>,
          },
        ]}
      />
      </div>
  )
}

export default Home
