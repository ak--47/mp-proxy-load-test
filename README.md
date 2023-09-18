# mp-proxy-load-test

load testing your [mixpanel tracking proxy](https://github.com/mixpanel/tracking-proxy)

### usage: 
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
this will generate ~6k users and ~100k events in your mixpanel project!

you can tune this setting in `prox-load-test.yml`:

```yml
  phases:
    - name: "load test proxy" 
      duration: 60 # length of test in seconds
      arrivalRate: 100 # users per second; 100 * 60 = 6000 users & ~100k events per minute 
```