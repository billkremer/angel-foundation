CREATE DATABASE test;

CREATE TABLE one (
  id SERIAL PRIMARY KEY,
  column2 TEXT,
  column3 TEXT
);

CREATE TABLE two (
  id SERIAL PRIMARY KEY,
  column2 TEXT,
  column3 TEXT,
  column4 TEXT
);

INSERT INTO one ("id","column2","column3","column4")
VALUES
(1,'123','cats','dogs'),
(2,'123','pets','people'),
(3,'124','another','something'),
(4,'125','pokee','smelly');

INSERT INTO  two ("id","column2","column3","column4")
VALUES
(1,'123','mm','nn','oo'),
(2,'124','aa','bb','cc'),
(3,'125','gg','ff','ee'),
(4,'126','jj','kk','ll'),
(5,'123','asdf','asdf','asdf');

Select * FROM one JOIN two ON one.column2 = two.column2;

--id	 column2	column3  column4	id	column2	column3	column4
--1	    123	    cats      dogs	   5	123	    asdf	   asdf
--1	    123	    cats      dogs	   1	123	    mm	     nn
--2	    123	    pets      people	 5	123	    asdf	   asdf
--2	    123	    pets      people	 1	123	    mm	     nn
--3	    124	    another   something	2	124	    aa	     bb
--4	    125	    pokee   	smelly	  3	125	    gg	     ff

SELECT DISTINCT ON (one.column2) * FROM one JOIN two ON one.column2 = two.column2;

-- id	column2	column3	column4	     id	column2	column3	column4
-- 1	  123	    cats	    dogs	      1	123	      mm	   nn
-- 3	  124	    another	  something	  2	124	      aa	   bb
-- 4	  125	    pokee	    smelly	    3	125	      gg	   ff

SELECT DISTINCT ON (one.column2) * FROM one RIGHT JOIN two ON one.column2 = two.column2;

-- id	column2	column3	 column4	  id	column2	column3	column4
-- 1	    123	  cats	  dogs	    5	   123	   asdf	  asdf
-- 3	    124	  another	something	2	   124	   aa	    bb
-- 4	    125	  pokee	  smelly	  3	   125	   gg   	ff
-- null  null   null    null			4	   126	   jj   	kk
