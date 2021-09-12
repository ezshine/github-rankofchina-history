const axios = require('axios');
const fs = require('fs');
const path = require('path');

const token = process.env.MYTOKEN;
const posturl = process.env.POSTURL;

let total_count = 0;

function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

function mkdirsSync(dirname){
	if(fs.existsSync(dirname)){
		return true;
	}else{
		if(mkdirsSync(path.dirname(dirname))){
			fs.mkdirSync(dirname);
			return true;
		}
	}
}

async function githubApiGet(url,data){
	if(!data)data={};
	console.log(url,data);
	
	let res;
	try{
		res  = await axios.get(url,{
			headers:{
				"Authorization":'Token '+token,
				"Accept":"application/vnd.github.v3+json"
			},
			params:data
		})
	}catch(err){
		console.log(err);
	}
	
	await delay(100);
	
	return res;
}

function getTodayFormat(){
	return (new Date().toISOString().slice(0, 10));
}

const extract = date => date.toISOString().split(/[^0-9]/).slice(0, -1);

async function getGithubRankByPage(page){
	var searchRes = await githubApiGet('https://api.github.com/search/users',{
		q:"location:China",
		sort:"followers",
		order:"desc",
		per_page:100,
		page:page
	})

	if(!searchRes)return [];

	total_count = searchRes.data.total_count;

	let list = [];
	let length = searchRes.data.items.length;

	for(var i = length-1;i>=0;i--){
		var oItem = searchRes.data.items[i];
		console.log("getting user "+(i+1)+'/'+length);
		var userRes = await githubApiGet('https://api.github.com/users/'+oItem.login);
		
		if(!userRes)break;

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
	var total = 10;

	var start = Date.now();

	var allList = [];
	for(var i=1;i<=total;i++){
		console.log("getting page "+i);
		var list =  await getGithubRankByPage(i);
		allList= allList.concat(list);
	}

	console.log(Date.now()-start);

	const dateExtract  = extract(new Date());

	var dirname = "rocdatas/"+dateExtract[0]+"/"+dateExtract[1];
	mkdirsSync(dirname);

	if(posturl)await axios.post(posturl,{
		record_date:getTodayFormat(),
		total_users:total_count,
		rank_list:allList
	});

	fs.writeFileSync(dirname+"/"+dateExtract[2]+".json",JSON.stringify(allList));
}

getGithubRank();