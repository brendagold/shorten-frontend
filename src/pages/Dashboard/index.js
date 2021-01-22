import React, { useState } from 'react';
import api from '../../services/api';
import { Container,  Button, Form, FormGroup, Input, Row, Col } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './dashboard.css';

const Dashboard = ({ history }) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [urlId, setUrlId] = useState('');

  const words = longUrl.toString().slice(0, 50) + '...';

  const handleSubmit = async (evt) => {
    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');
    evt.preventDefault();

    const response = await api.post(
      '/shorten',
      { longUrl },
      {
        headers: { user_id },
      }
    );

    setShortUrl(response.data.shortUrl);
    setUrlId(response.data._id);

    setShowTable(true);
  };

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const emptyForm = () => {
    document.getElementById('url-form').reset();
  };

  const handleUrl = async () => {
    await api.delete(`/url/${urlId}`);
    setDeleted(true);

    setTimeout(() => {
      setDeleted(false);
    }, 1000);

    setTimeout(() => {
      setShowTable(false);
      emptyForm();
    }, 2000);
  };

  const Results = () => (
    <div className="result">
      <ul className="result-ul">
        <li>{words}</li>
        <li className="result-short">
          {shortUrl}
          <span>
            <a className="icon-style">
              <CopyToClipboard text={shortUrl} onCopy={() => handleCopy()}>
                <i className="far  fa-copy"></i>
              </CopyToClipboard>
            </a>
            {copied ? <span style={{ color: 'green' }}>Copied</span> : null}
            <a className="icon-style">
              <i className="fa  fa-trash" onClick={() => handleUrl()}></i>
            </a>
            {deleted ? <span style={{ color: 'red' }}>Deleted</span> : null}
          </span>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="dashboard">
      <Container>
      <Row>
        <Col sm="6" xs="6">
          <h2>Welcome, let's get your links shortened</h2>
        </Col>
        <Col sm="6" xs="6"><img src="/shorten.svg" className="img-hero" alt="shorten"/></Col>
      </Row>
      </Container>
      <Container>
        <Form onSubmit={handleSubmit} id="url-form">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="text"
              name="longurl"
              id="longurl"
              placeholder="Paste Your URL Here"
              onChange={(evt) => setLongUrl(evt.target.value)}
            />
          </FormGroup>

          <Button className="shorten-btn">Shorten</Button>
        </Form>
      </Container>
      <Container>{showTable ? <Results /> : null}</Container>

      <Row>
        <Col xs="6">
          <h2>Welcome, let's get your links shortened</h2>
        </Col>
        <Col xs="6"><img src="/shorten.svg" alt="shorten"/></Col>
      </Row>
    </div>
  );
};

export default Dashboard;
