import { CommentSection } from './Comment/CommentSection.jsx';
import { PostContent } from './PostContent.jsx';

export function Post() {
    return (
        <main className="blog-main">
            <PostContent />
            <CommentSection />
        </main>
    );
}
