CREATE DEFINER=`root`@`localhost` FUNCTION `isPersian`(
title varchar(400),
secondLangId int
) RETURNS int
    DETERMINISTIC
BEGIN


SELECT title regexp '[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]' into @isPersianValue;

IF @isPersianValue = 0 then
	set @isPersianValue = secondLangId;
END IF;

RETURN @isPersianValue;
END
