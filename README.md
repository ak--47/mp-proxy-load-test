# mp-proxy-load-test
let's make sure the proxy can scale, before we use it!

```bash
git clone https://github.com/ak--47/mp-proxy-load-test.git
cd mp-proxy-load-test
npm install
export TOKEN='your-mixpanel-token'
export PROXY_URL='https://path/to/proxy'
npm run start
```

for repeat testing, you may wish to create a `.env` file of the form:

```
PROXY_URL=your-proxy-url
TOKEN=your-project-token
```

### WARNING:
this will generate ~20k users and ~500k events in your mixpanel project!