const appId = 'WseivnWRXpRmuaGBplSi7lvV-gzGzoHsz';
const appKey = 'jntvc9AS3386f7ciMzwMY9t8';
AV.init({ appId, appKey });

const TestObject = AV.Object.extend('Playlist');
const testObject = new TestObject();
(async () => {
    await testObject.save({
        name: 'test',
        cover: 'test',
        creatorId: 'test',
        songs: [1, 2],
    });
    alert('LeanCloud Rocks!');
})();
