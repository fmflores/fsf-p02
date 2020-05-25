// model:generate --name Podcast --attributes name:string,author:string,rssUrl:string

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Podcast = sequelize.define('Podcast', {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    rssUrl: DataTypes.STRING
  }, {});

  Podcast.associate = function (models) {
    this.hasMany(models.PodcastEpisode);
    // this.hasMany(models.PodcastuserData);
  };

  return Podcast;
};
