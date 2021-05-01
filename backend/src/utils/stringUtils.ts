

export function slugify(title: string) : string {

    let character = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                    '0','1','2','3','4','5','6','7','8','9']
    
    let slugarr = [];
    for(let i = 0; i < title.length; i++) {

        if(i > 23) break;

        let char = title[i].toLowerCase();
        if(char >= 'a' && char <= 'z') {
            slugarr.push(char);
        } else {
            slugarr.push('-');
        }

    }

    slugarr.push('-');

    for(let i = 0; i < 6; i++) {
        let ind = Math.floor(Math.random() * 62);
        let c = character[ind];
        slugarr.push(c)
    }

    return slugarr.join('');

}