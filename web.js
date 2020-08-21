const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client();

bot.login(botconfig.token);
bot.on("ready", async () => {
  console.log(`${bot.user.username} 봇이 정상적으로 켜졌습니다.`);
  let activNum = 1;
  setInterval(function() { 
      if (activNum === 1) {
        bot.user.setActivity("!도움말을 입력하여 명령어 확인");
        activNum = 2;
    } else if (activNum === 2) {
        bot.user.setActivity("#ㅣ규칙을 확인하여 서버 규칙 확인");
        activNum = 3;
    } else if (activNum === 3) {
        bot.user.setActivity("문의/버그제보: 진서면#4060")
        activNum = 1;
    }
}, 10000);
});

bot.on("message", async message => {
  if(message.author.bot) return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let bicon = bot.user.displayAvatarURL;
  let member = message.member;
  let client = message.channel.client;
  let author = message.author;
  function delay (delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
 }

  if (cmd === `${prefix}도움말`) {
     let info = new Discord.RichEmbed()
         .setColor("#238195")
         .setAuthor("가상국가전쟁 종합관리시스템", bicon)
         .setTitle("가상국가전쟁 명령어 목록")
         .setThumbnail(bicon)
         .setDescription("이후 내용은 이 봇에서 사용할 수 있는 명령어를 정리해둔 목록입니다\n현재 작동 가능한 것들만 작성해 두었습니다.")
         .addField("!도움말", "가상국가전쟁 봇에 있는 명령어를 확인할 수 있습니다.")
         .addField("!영토획득 [지역]", "영토획득 신청을 진행할 수 있으며 관리자에게 DM이 전송됩니다.")
         .addField("!전쟁신청 [국가] [지역]", "타 국가의 영토를 뺏을 수 있는 전쟁신청이 가능합니다. 관리자가 확인 후 해당 국가의 해당 지역과 전쟁합니다.")
         .addField("!전쟁시작 (관리자전용)", "전쟁을 시작할 수 있는 명령어입니다. 관리자만 작성 가능합니다.")
      message.channel.send(info);
   }
  if (cmd === `${prefix}전쟁신청`) {
    if(!args.length) {
      let applyfail = new Discord.RichEmbed()
          .setColor("#DE6449")
          .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
          .setTitle("전쟁신청 실패")
          .setDescription("!전쟁신청 [국가] [지역] 명령어를 전부 입력해주세요.");
      message.channel.send(applyfail);
    } else {
          let succeed = new Discord.RichEmbed()
          .setColor("#238195")
          .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
          .setTitle("전쟁신청 완료")
          .setDescription(`**${args[0]}** 국가의 **${args[1]}** 지역에서 진행하는 전쟁신청이 **정상적으로 완료**되었습니다.\n지정한 시간이 되면 멘션과 함께 전쟁이 시작되오니 **반드시** 참여하시기 바랍니다.`);
          message.channel.send(succeed);
          client.fetchUser('391417643418255372').then((user) => {
            let waraccess = new Discord.RichEmbed()
            .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
            .setTitle(`전쟁신청 명령어 사용안내`)
            .setColor("#DE6449")
            .setDescription(`${author} 유저가 전쟁신청을 진행하였습니다.\n이후 두 국가 모두 온라인 상태가 된다면 전쟁을 진행해 주십시요.`)
            .addField("전쟁대상국", `${args[0]}`, true)
            .addField("전쟁지역", `${args[1]}`, true)
            .addField("유저이름", `${author}`, true)
            .setTimestamp();
          user.send(waraccess);
          })
      }
    }
    if (cmd === `${prefix}영토획득`) {
      if(!args.length) {
        let landfail = new Discord.RichEmbed()
        .setColor("#DE6449")
        .setAuthor("가상국가전쟁 영토관리시스템", bicon)
        .setTitle("영토획득 신청 실패")
        .setDescription("!영토획득 [지역명] 명령어를 전부 입력해주세요.");
        message.channel.send(landfail);
      } else {
        let landsincheong = new Discord.RichEmbed()
        .setColor("#238195")
        .setAuthor("가상국가전쟁 영토관리시스템", bicon)
        .setTitle("영토획득 신청 완료")
        .setDescription(`${args[0]} 지역의 영토획득 신청이 **정상적으로 완료**되었습니다.\n이후 관리자가 확인하거나 지도에 반영하면 안내하겠습니다.`);
  
        let landcheck = new Discord.RichEmbed()
        .setColor("#238195")
        .setAuthor("가상국가전쟁 영토관리시스템", bicon)
        .setTitle("영토획득 확인 완료")
        .setDescription(`${args[0]} 지역의 영토획득 신청이 **관리자에 의해 확인**되었습니다.\n이후 **지도에 다음 내용이 반영** 이 메세지의 내용이 수정됩니다.`);
  
        let landsuccess = new Discord.RichEmbed()
        .setColor("#238195")
        .setAuthor("가상국가전쟁 영토관리시스템", bicon)
        .setTitle("영토획득 반영 완료")
        .setDescription(`${args[0]} 지역의 영토획득 신청이 지도에 **정식적으로 반영**되었습니다.\n아래 내용은 영토획득 신청 내역입니다.`)
        .addField(`지역명`, `${args[0]}`, true)
        .addField(`신청결과`, `정상처리`, true);
  
        let landfail = new Discord.RichEmbed()
        .setColor("#238195")
        .setAuthor("가상국가전쟁 영토관리시스템", bicon)
        .setTitle("영토획득 반영 거부")
        .setDescription(`${args[0]} 지역의 영토획득 신청이 거절되었습니다.\n중복된 지역이거나 이미 다른 사람이 가져간 영토일 수 있습니다. !전쟁신청 혹은 !영토획득 명령어를 이용해 다른 지역을 획득하세요.`)
        .addField(`지역명`, `${args[0]}`, true)
        .addField(`신청결과`, `신청거절`, true);
        message.channel.send(landsincheong);
        client.fetchUser('391417643418255372').then((user) => {
          let landaccess = new Discord.RichEmbed()
          .setAuthor("가상국가전쟁 영토관리시스템", bicon)
          .setTitle(`영토획득 명령어 사용안내`)
          .setColor("#238195")
          .setDescription("영토획득 신청을 허가하려면 :green_square: 이모지를,\n거절하시려면 :red_square: 이모지를 선택해주세요.\n지도 반영이 완료되었다면 :map: 아이콘을 눌러주세요.")
          .addField("지역이름", `${args[0]}`, true)
          .addField("유저이름", `${author}`, true)
          .setTimestamp();
        user.send(landaccess).then(msg => {
          msg.react('🟩');
          delay(1000);
          msg.react(`🟥`);
          delay(2000);
          msg.react(`🗺️`);
        })
      })
    }
  }

  if (cmd === `${prefix}외교신청`) {
    if(!args.length) {
      let commufail = new Discord.RichEmbed()
      .setColor("#DE6449")
      .setAuthor("가상국가전쟁 종합관리시스템", bicon)
      .setTitle("외교신청 실패")
      .setDescription("!외교신청 [국가] 명령어를 전부 입력해주세요.");
      message.channel.send(commufail);
    } else {
      let commusincheong = new Discord.RichEmbed()
      .setColor("#238195")
      .setAuthor("가상국가전쟁 종합관리시스템", bicon)
      .setTitle("외교신청 완료")
      .setDescription(`${args[0]} 국가와의 외교신청이 **정상적으로 완료**되었습니다.\n이후 관리자가 ${args[0]} 국가의 반응을 전달할 예정입니다.`);
      message.channel.send(commusincheong);
      client.fetchUser('391417643418255372').then((user) => {
        let commuaccess = new Discord.RichEmbed()
        .setAuthor("가상국가전쟁 종합관리시스템", bicon)
        .setTitle(`외교신청 명령어 사용안내`)
        .setColor("#238195")
        .setDescription("외교신청에 대한 상대 국가의 반응을 확인하고 전달해주세요.")
        .addField("대상국가", `${args[0]}`, true)
        .addField("유저이름", `${author}`, true)
        .setTimestamp();
      user.send(commuaccess);
    })
  }
}
  if(cmd === `${prefix}전쟁시작`){
    function getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
     }

    if(!args.length) {
      let startfail = new Discord.RichEmbed()
      .setColor("#DE6449")
      .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
      .setTitle("전쟁시작 실패")
      .setDescription("!전쟁시작 [공격국] [방어국] [지역] 순서대로 입력해주세요.");
      message.channel.send(startfail);
    } else if (!member.hasPermission('ADMINISTRATOR', {
            checkAdmin: false,
            checkOwner: false
        })) {
          let startfail2 = new Discord.RichEmbed()
          .setColor("#DE6449")
          .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
          .setThumbnail(bicon)
          .setTitle("전쟁시작 실패")
          .setDescription("권한이 없습니다. 관리자를 호출하여 진행하세요.");
          message.channel.send(startfail2);
          } else {
            let warstart = new Discord.RichEmbed()
            .setColor("#238195")
            .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
            .setTitle(`${args[0]} vs ${args[1]}의 ${args[2]} 지역 전쟁`)
            .setDescription("전쟁이 곧 시작됩니다. 3초 후 일정한 규칙에 따라 랜덤한 숫자가 나오게 됩니다.");
            message.channel.send(warstart)
            .then(msg => {
              msg.delete(5000)
            });
            
            let win1 = 0;
            let win2 = 0;
            let win3 = 0;
            let win4 = 0;
            let win5 = 0;
            let win6 = 0;
            let win7 = 0;
            let win8 = 0;
            let win9 = 0;
            let win10 = 0;
            let numdiff = 0;
            let numdiff0 = 0;
            let numdiff00 = 0;
            let numdiff000 = 0;
            let numdiff0000 = 0;
            let numdiff00000 = 0;
            let numdiff000000 = 0;
            let numdiff0000000 = 0;
            let numdiff00000000 = 0;
            let numdiff000000000 = 0;
            let number1 = getRandom(40, 60); // args[0]에 대한 1차 난수
            let number2 = getRandom(40, 60); // args[1]에 대한 1차 난수
            if(number1>number2) {
              numdiff = number1-number2;
              win1 = args[0]; 
            } if(number2>number1) {
              numdiff = number2-number1; 
              win1 = args[1];
            }
      
            let number01 = getRandom(number1-10, number1+10) // args[0]에 대한 2차 난수
            let number02 = getRandom(number2-10, number2+10) // [args[1]에 대한 2차 난수
            if(number01>number02) {
              numdiff0 = number01-number02;
              win2 = args[0];
            } if(number02>number01) {
              numdiff0 = number02-number01;
              win2 = args[1]; }
      
            let number001 = getRandom(number01-10, number01+10) // args[0]에 대한 3차 난수
            let number002 = getRandom(number02-10, number02+10) // [args[1]에 대한 3차 난수 
            if(number001>number002) {
              numdiff00 = number001-number002;
              win3 = args[0]; }
            if(number002>number001) {
              numdiff00 = number002-number001;
              win3 = args[1]; }
      
            let number0001 = getRandom(number001-10, number001+10) // args[0]에 대한 4차 난수
            let number0002 = getRandom(number002-10, number002+10) // [args[1]에 대한 4차 난수
            if(number0001>number0002) {
              numdiff000 = number0001-number0002;
              win4 = args[0];
            } if(number0002>number0001) {
              numdiff000 = number0002-number0001; 
              win4 = args[1]; }
      
            let number00001 = getRandom(number0001-10, number0001+10) // args[0]에 대한 5차 난수
            let number00002 = getRandom(number0002-10, number0002+10) // [args[1]에 대한 5차 난수 
            if(number00001>number00002) {
              numdiff0000 = number00001-number00002;
              win5 = args[0];
            } if(number00002>number00001) {
              numdiff0000 = number00002-number00001;
              win5 = args[1]; }
      
            let number000001 = getRandom(number00001-10, number00001+10) // args[0]에 대한 6차 난수
            let number000002 = getRandom(number00002-10, number00002+10) // [args[1]에 대한 6차 난수 
            if(number000001 > 100) number000001 = 100; if(number000002 > 100) number000002 = 100;
            if(number000001 < 0) number000001 = 0; if(number000002 < 0) number000002 = 0;
            if(number000001>number000002) {
              numdiff00000 = number000001-number000002;
               win6 = args[0];
            } if(number000002>number000001) {
              numdiff00000 = number000002-number000001;
              win6 = args[1]; }
      
            let number0000001 = getRandom(number000001-10, number000001+10) // args[0]에 대한 7차 난수
            let number0000002 = getRandom(number000002-10, number000002+10) // [args[1]에 대한 7차 난수 
            if(number0000001 > 100) number0000001 = 100; if(number0000002 > 100) number0000002 = 100;
            if(number0000001 < 0) number0000001 = 0; if(number0000002 < 0) number0000002 = 0;
            if(number0000001>number0000002) {
            numdiff000000 = number0000001-number0000002;
            win7 = args[0]; 
            } if(number0000002>number0000001) {
            numdiff000000 = number0000002-number0000001;
            win7 = args[1]; }
      
            let number00000001 = getRandom(number0000001-10, number0000001+10) // args[0]에 대한 8차 난수
            let number00000002 = getRandom(number0000002-10, number0000002+10) // [args[1]에 대한 8차 난수 
            if(number00000001 > 100) number00000001 = 100; if(number00000002 > 100) number00000002 = 100;
            if(number00000001 < 0) number00000001 = 0; if(number00000002 < 0) number00000002 = 0;
            if(number00000001>number00000002) {
            numdiff0000000 = number00000001-number00000002;
            win8 = args[0]; 
            } if(number00000002>number00000001) {
            numdiff0000000 = number00000002-number00000001;
            win8 = args[1]; }
      
            let number000000001 = getRandom(number00000001-10, number00000001+10) // args[0]에 대한 9차 난수
            let number000000002 = getRandom(number00000002-10, number00000002+10) // [args[1]에 대한 9차 난수 
            if(number000000001 > 100) number000000001 = 100; if(number000000002 > 100) number000000002 = 100;
            if(number000000001 < 0) number000000001 = 0; if(number000000002 < 0) number000000002 = 0;
            if(number000000001>number000000002) {
            numdiff00000000 = number000000001-number000000002;
            win9 = args[0];
            } if(number000000002>number000000001) {
            numdiff00000000 = number000000002-number000000001;
            win9 = args[1]; }
      
            let number0000000001 = getRandom(number000000001-10, number000000001+10) // args[0]에 대한 10차 난수
            let number0000000002 = getRandom(number000000002-10, number000000002+10) // [args[1]에 대한 10차 난수 
            if(number0000000001 > 100) number0000000001 = 100; if(number0000000002 > 100) number0000000002 = 100;
            if(number0000000001 < 0) number0000000001 = 0; if(number0000000002 < 0) number0000000002 = 0;
            if(number0000000001>number0000000002) {
              numdiff000000000 = number0000000001-number0000000002;
              win10 = args[0]; 
            } if(number0000000002>number0000000001) {
              numdiff000000000 = number0000000002-number0000000001;
              win10 = args[1]; }
      
            setTimeout(function() {
             
              let war1 = new Discord.RichEmbed()
              .setColor("#238195")
              .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
              .setThumbnail(bicon)
              .setTitle(`전쟁 진행상황`)
              .addField(`전쟁 우세`, `${win1}`)
              .addField('\u200B', '\u200B')
              .addField(`${args[0]}`, `${number1}`, true)
              .addField(`${args[1]}`, `${number2}`, true)
              .addField(`격차`, `${numdiff}`, true)
              .addField(`전쟁 지역`, `${args[2]}`, true)
              .addField(`진행 횟수`, `1/10(1회차)`, true)
              .setTimestamp()
              .setFooter("3초마다 업데이트됩니다. 마지막 수정", bicon);
      
              let war2 = new Discord.RichEmbed()
              .setColor("#238195")
              .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
              .setThumbnail(bicon)
              .setTitle(`전쟁 진행상황`)
              .addField(`전쟁 우세`, `${win2}`)
              .addField('\u200B', '\u200B')
              .addField(`${args[0]}`, `${number01}`, true)
              .addField(`${args[1]}`, `${number02}`, true)
              .addField(`격차`, `${numdiff0}`, true)
              .addField(`전쟁 지역`, `${args[2]}`, true)
              .addField(`진행 횟수`, `2/10(2회차)`, true)
              .setTimestamp()
              .setFooter("3초마다 업데이트됩니다. 마지막 수정", bicon);
      
              let war3 = new Discord.RichEmbed()
              .setColor("#238195")
              .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
              .setThumbnail(bicon)
              .setTitle(`전쟁 진행상황`)
              .addField(`전쟁 우세`, `${win3}`)
              .addField('\u200B', '\u200B')
              .addField(`${args[0]}`, `${number001}`, true)
              .addField(`${args[1]}`, `${number002}`, true)
              .addField(`격차`, `${numdiff00}`, true)
              .addField(`전쟁 지역`, `${args[2]}`, true)
              .addField(`진행 횟수`, `3/10(3회차)`, true)
              .setTimestamp()
              .setFooter("3초마다 업데이트됩니다. 마지막 수정", bicon);

              let war4 = new Discord.RichEmbed()
              .setColor("#238195")
              .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
              .setThumbnail(bicon)
              .setTitle(`전쟁 진행상황`)
              .addField(`전쟁 우세`, `${win4}`)
              .addField('\u200B', '\u200B')
              .addField(`${args[0]}`, `${number0001}`, true)
              .addField(`${args[1]}`, `${number0002}`, true)
              .addField(`격차`, `${numdiff000}`, true)
              .addField(`전쟁 지역`, `${args[2]}`, true)
              .addField(`진행 횟수`, `4/10(4회차)`, true)
              .setTimestamp()
              .setFooter("3초마다 업데이트됩니다. 마지막 수정", bicon);

              let war5 = new Discord.RichEmbed()
              .setColor("#238195")
              .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
              .setThumbnail(bicon)
              .setTitle(`전쟁 진행상황`)
              .addField(`전쟁 우세`, `${win5}`)
              .addField('\u200B', '\u200B')
              .addField(`${args[0]}`, `${number00001}`, true)
              .addField(`${args[1]}`, `${number00002}`, true)
              .addField(`격차`, `${numdiff0000}`, true)
              .addField(`전쟁 지역`, `${args[2]}`, true)
              .addField(`진행 횟수`, `5/10(5회차)`, true)
              .setTimestamp()
              .setFooter("3초마다 업데이트됩니다. 마지막 수정", bicon);

              let war6 = new Discord.RichEmbed()
              .setColor("#238195")
              .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
              .setThumbnail(bicon)
              .setTitle(`전쟁 진행상황`)
              .addField(`전쟁 우세`, `${win6}`)
              .addField('\u200B', '\u200B')
              .addField(`${args[0]}`, `${number000001}`, true)
              .addField(`${args[1]}`, `${number000002}`, true)
              .addField(`격차`, `${numdiff00000}`, true)
              .addField(`전쟁 지역`, `${args[2]}`, true)
              .addField(`진행 횟수`, `6/10(6회차)`, true)
              .setTimestamp()
              .setFooter("3초마다 업데이트됩니다. 마지막 수정", bicon);

              let war7 = new Discord.RichEmbed()
              .setColor("#238195")
              .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
              .setThumbnail(bicon)
              .setTitle(`전쟁 진행상황`)
              .addField(`전쟁 우세`, `${win7}`)
              .addField('\u200B', '\u200B')
              .addField(`${args[0]}`, `${number0000001}`, true)
              .addField(`${args[1]}`, `${number0000002}`, true)
              .addField(`격차`, `${numdiff000000}`, true)
              .addField(`전쟁 지역`, `${args[2]}`, true)
              .addField(`진행 횟수`, `7/10(7회차)`, true)
              .setTimestamp()
              .setFooter("3초마다 업데이트됩니다. 마지막 수정", bicon);

              let war8 = new Discord.RichEmbed()
              .setColor("#238195")
              .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
              .setThumbnail(bicon)
              .setTitle(`전쟁 진행상황`)
              .addField(`전쟁 우세`, `${win8}`)
              .addField('\u200B', '\u200B')
              .addField(`${args[0]}`, `${number00000001}`, true)
              .addField(`${args[1]}`, `${number00000002}`, true)
              .addField(`격차`, `${numdiff0000000}`, true)
              .addField(`전쟁 지역`, `${args[2]}`, true)
              .addField(`진행 횟수`, `8/10(8회차)`, true)
              .setTimestamp()
              .setFooter("3초마다 업데이트됩니다. 마지막 수정", bicon);

              let war9 = new Discord.RichEmbed()
              .setColor("#238195")
              .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
              .setThumbnail(bicon)
              .setTitle(`전쟁 진행상황`)
              .addField(`전쟁 우세`, `${win9}`)
              .addField('\u200B', '\u200B')
              .addField(`${args[0]}`, `${number000000001}`, true)
              .addField(`${args[1]}`, `${number000000002}`, true)
              .addField(`격차`, `${numdiff00000000}`, true)
              .addField(`전쟁 지역`, `${args[2]}`, true)
              .addField(`진행 횟수`, `9/10(9회차)`, true)
              .setTimestamp()
              .setFooter("3초마다 업데이트됩니다. 마지막 수정", bicon);

              let war10 = new Discord.RichEmbed()
              .setColor("#238195")
              .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
              .setThumbnail(bicon)
              .setTitle(`전쟁 진행상황`)
              .addField(`전쟁 우세`, `${win10}`)
              .addField('\u200B', '\u200B')
              .addField(`${args[0]}`, `${number0000000001}`, true)
              .addField(`${args[1]}`, `${number0000000002}`, true)
              .addField(`격차`, `${numdiff000000000}`, true)
              .addField(`전쟁 지역`, `${args[2]}`, true)
              .addField(`진행 횟수`, `10/10(10회차)`, true)
              .setTimestamp()
              .setFooter("3초마다 업데이트됩니다. 마지막 수정", bicon); 

              let warresult = new Discord.RichEmbed()
              .setColor("#238195")
              .setAuthor("가상국가전쟁 전쟁관리시스템", bicon)
              .setThumbnail(bicon)
              .setTitle(`${args[2]} 지역의 전쟁 결과`)
              .addField('\u200B', '\u200B')
              .addField(`${args[0]}`, `${number1} (1회차)\n${number01} (2회차)\n${number001} (3회차)\n${number0001} (4회차)\n${number00001} (5회차)\n${number000001} (6회차)\n${number0000001} (7회차)\n${number00000001} (8회차)\n${number000000001} (9회차)\n\n**${number0000000001}** (10회차/최종)`, true)
              .addField(`${args[1]}`, `${number2} (1회차)\n${number02} (2회차)\n${number002} (3회차)\n${number0002} (4회차)\n${number00002} (5회차)\n${number000002} (6회차)\n${number0000002} (7회차)\n${number00000002} (8회차)\n${number000000002} (9회차)\n\n**${number0000000002}** (10회차/최종)`, true)
              .addField(`격차`, `${numdiff} (1회차)\n${numdiff0} (2회차)\n${numdiff00} (3회차)\n${numdiff000} (4회차)\n${numdiff0000} (5회차)\n${numdiff00000} (6회차)\n${numdiff000000} (7회차)\n${numdiff0000000} (8회차)\n${numdiff00000000} (9회차)\n\n**${numdiff000000000}** (10회차/최종)`, true)
              .addField(`전쟁 결과`, `**${win10}** 승리`, true)
              .addField(`전쟁 지역`, `${args[2]}`, true);

              message.channel.send(war1).catch().then(msg => { 
              delay(3000); 
              msg.edit(war2).catch().then(msg => {
                delay(3000);
                msg.edit(war3).catch().then(msg => {
                  delay(3000);
                  msg.edit(war4).catch().then(msg => {
                    delay(3000);
                    msg.edit(war5).catch().then(msg => {
                      delay(3000);
                      msg.edit(war6).catch().then(msg => {
                        delay(3000);
                        msg.edit(war7).catch().then(msg => {
                          delay(3000);
                          msg.edit(war8).catch().then(msg => {
                            delay(3000);
                            msg.edit(war9).catch().then(msg => {
                              delay(3000);
                              msg.edit(war10).catch().then(msg => {
                                delay(3000);
                                msg.edit(warresult);
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
              }, 3000);
              
          }
        }
      },)

    
