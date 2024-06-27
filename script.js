document.addEventListener('DOMContentLoaded', () => {
    const memeCoinsDisplay = document.getElementById('memeCoins');
    let memeCoins = parseInt(localStorage.getItem('memeCoins')) || 0;
    memeCoinsDisplay.textContent = memeCoins;

    const updateMemeCoins = (amount) => {
        memeCoins += amount;
        localStorage.setItem('memeCoins', memeCoins);
        memeCoinsDisplay.textContent = memeCoins;
    };

    // Quest: Post a meme
    const postMemeInput = document.getElementById('postMemeInput');
    const postMemeButton = document.getElementById('postMemeButton');
    postMemeButton.addEventListener('click', () => {
        if (postMemeInput.value.trim() !== "") {
            updateMemeCoins(5);
            postMemeInput.disabled = true;
            postMemeButton.disabled = true;
            postMemeButton.textContent = 'Completed';
        }
    });

    // Quest: React to 10 messages
    const reactMessagesButton = document.getElementById('reactMessagesButton');
    const reactButtons = document.querySelectorAll('.react-button');
    let reactionCount = 0;
    reactButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (reactionCount < 10) {
                reactionCount++;
                document.getElementById('reactionCount').textContent = `${reactionCount} / 10 Reactions`;
                if (reactionCount === 10) {
                    updateMemeCoins(10);
                    reactMessagesButton.disabled = true;
                    reactMessagesButton.textContent = 'Completed';
                }
            }
        });
    });

    // Quest: Invite a friend
    const inviteFriendButton = document.getElementById('inviteFriendButton');
    inviteFriendButton.addEventListener('click', () => {
        updateMemeCoins(15);
        inviteFriendButton.disabled = true;
        inviteFriendButton.textContent = 'Completed';
    });

    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemPrice = parseInt(button.parentElement.getAttribute('data-price'));
            if (memeCoins >= itemPrice) {
                updateMemeCoins(-itemPrice);
                alert('Purchase successful!');
            } else {
                alert('Not enough Meme Coins!');
            }
        });
    });
});
