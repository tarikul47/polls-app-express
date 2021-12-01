const Poll = require("./Poll");

exports.pollGetController = async (req, res) => {
  try {
    let polls = await Poll.find();
    res.render("polls", { polls });
  } catch (e) {
    console.log(e);
  }
};

exports.viewPollPostController = async (req, res) => {
  let id = req.params.id;
  let optionId = req.body.option;
  //console.log(req.body)

  try {
    let poll = await Poll.findById(id);
    let options = [...poll.options];
    let index = options.findIndex((o) => o.id === optionId);
    options[index].vote = parseInt(options[index].vote) + 1;

    let totalVote = poll.totalVote + 1;
    await Poll.findOneAndUpdate(
      { _id: poll._id },
      { $set: { options, totalVote } }
    );
    res.redirect("/poll/"+ id);
  } catch (e) {
    console.log(e);
  }
};

exports.viewPollSingleController = async (req, res) => {
  let id = req.params.id;
  try {
    let polls = await Poll.findById(id);
    let options = [...polls.options];
    let result = [];
    options.map(option => {
        let percentage = (option.vote * 100) / polls.totalVote;
        result.push({
            ...option._doc,
            percentage: percentage ? percentage :  0 ,
        })
    })
    res.render("viewPoll", { polls, result });
  } catch (e) {
    consol.log(e);
  }
};

exports.pollPostController = async (req, res) => {
  let { title, description, options } = req.body;

  options = options.map((option) => {
    return {
      name: option,
      vote: 0,
    };
  });
  console.log(options);

  let poll = new Poll({
    title,
    description,
    options,
  });

  try {
    await poll.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};
