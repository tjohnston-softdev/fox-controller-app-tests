function delayOfflineTest(delayDone)
{
	setTimeout(function()
	{
		delayDone();
	}, 1000);
}


module.exports = delayOfflineTest;