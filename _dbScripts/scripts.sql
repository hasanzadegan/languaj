drop table if exists USERMISTAKE;

/*==============================================================*/
/* Table: USERMISTAKE                                           */
/*==============================================================*/
create table USERMISTAKE
(
   USERMISTAKEID        int not null auto_increment,
   USERID               int,
   LEVELID              int,
   MISTAKEDATE          datetime,
   REVIEW               int,
   SOLVED               bit,
   MISTAKEJSON          varchar(4000),
   primary key (USERMISTAKEID),
   key AK_KEY_1 (USERMISTAKEID)
);

alter table USERMISTAKE add constraint FK_REFERENCE_72 foreign key (USERID)
      references USER (USERID) on delete restrict on update restrict;

alter table USERMISTAKE add constraint FK_REFERENCE_73 foreign key (LEVELID)
      references LEVEL (LEVELID) on delete restrict on update restrict;
