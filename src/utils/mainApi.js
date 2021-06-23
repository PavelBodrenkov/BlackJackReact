export const login = (name, password) => {
    return fetch('https://p1.fan-sports.ru/signin', {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            name:name,
            password:password
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      });
}

export const domen = () => {
    // return fetch('http://resolve.zapret-net.com/DnsManager.svc/90fcfae8-291a-451b-a4ff-95d7fc78601d/GetResourceAvailableStatusForRegion?regionId=230&availbalePoint=1&resourceId=1', {
        
        
    // })
    // .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    const proxyurl = "https://thingproxy.freeboard.io/fetch/"; //Прокси как ты понял
    const url = "http://resolve.zapret-net.com/DnsManager.svc/90fcfae8-291a-451b-a4ff-95d7fc78601d/GetResourceAvailableStatusForRegion?regionId=230&availbalePoint=1&resourceId=1"; // твой сайт который не отправляет CORS
    return fetch(proxyurl + url) 
      .then(response => response.json())
}