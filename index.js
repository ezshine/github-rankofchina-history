const axios = require('axios');
const fs = require('fs');

function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function githubApiGet(url,data){
	if(!data)data={};
	console.log(url,data);
	
	const res  = await axios.get(url,{
		headers:{
			"Authorization":'Token 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',
			"Accept":"application/vnd.github.v3+json"
		},
		params:data
	})
	
	await delay(100);
	
	return res;
}

function getTodayFormat(){
	return (new Date().toISOString().slice(0, 10));
}

async function getGithubRankByPage(page){
	var searchRes = await githubApiGet('https://api.github.com/search/users',{
		q:"location:China",
		sort:"followers",
		order:"desc",
		per_page:100,
		page:page
	})

	let list = [];
	let length = searchRes.data.items.length;

	for(var i = length-1;i>=0;i--){
		var oItem = searchRes.data.items[i];
		console.log("getting user "+(i+1)+'/'+length);
		var userRes = await githubApiGet('https://api.github.com/users/'+oItem.login);
		
		var item = userRes.data;
		
		list.unshift({
			login:item.login,
			name:item.name,
			location:item.location,
			company:item.company,
			blog:item.blog,
			email:item.email,
			avatar_url:item.avatar_url,
			followers:item.followers
		});
	}

	return list;
}

async function getGithubRank(){
	var total = 1;

	var start = Date.now();

	var allList = [];
	for(var i=1;i<=total;i++){
		console.log("getting page "+i);
		var list =  await getGithubRankByPage(i);
		allList= allList.concat(list);
	}

	console.log(Date.now()-start);

	fs.writeFileSync("github-china-rank-"+getTodayFormat()+".json",JSON.stringify(allList));
}

getGithubRank();