"use client";

import { createPost, deleteImageWithUrl } from "@/actions/post.action";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "dompurify";
import Image from '@tiptap/extension-image'
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import toast from "react-hot-toast";

export function Editor() {

    const [imageList, setImageList] = useState<string[]>([]);
    const [header, setHeader] = useState('');

    const editor = useEditor({
        editorProps: {
            attributes: {
                class: "prose text-white prose-headings:text-white max-w-none prose-headings:font-bold prose-p:m-0 prose-img:rounded-lg",
            },
        },
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2],
                },
            }),
            Image,

        ],
        content: "<p>Hello World! 🌎️</p>",
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    const addImageToParentList = (url: string) => {
        editor.chain().focus().insertContent([
            {
                type: 'image',
                attrs: {
                    src: url,
                },
            }])
            .run();
        setImageList((prev) => [...prev, url]);
    };

    /*
    TODO Add a way to delete images when the user decided to not post
    Create a new table with the userId and imageList
    When the user first upload an image and the imageList is 0, create the table
    if the user uploads, delete the table from user key
    else if they leaves drafted, take the table and delete the images, then the table
    // Delete images if the user decided not to submit and leaves the site
    window.addEventListener('beforeunload', (e)  => {
        e.preventDefault();
        if (imageList.length > 0) {
           deleteImageWithUrl(imageList.toString());

        } else {
            console.log('no drafted images to delete')
        }
    });
    */


    const handleSubmit = async () => {
        try {
            const headerContent = header;
            const content = editor.getHTML();
            //const contentCleaned = DOMPurify.sanitize(content);
            await createPost(headerContent, content, imageList.toString());

            //setImageList([]);

            toast.success("Post uploaded successfully!");
            editor.commands.clearContent();
            setHeader('');

        } catch (error) {
            console.error("Error uploading post:", error);
            alert(error);
        }
    };

    return (
        <div className="border p-4">
            {/* Header */}
            <div className="flex flex-col mb-4">
                <label htmlFor='header'>Post Header</label>
                <input onChange={(e) => setHeader(e.target.value)} className="border border-yellow-50" name="header" type="text"></input>
            </div>

            {/* Toolbar */}
            <div className="mb-2 space-x-2">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "font-bold" : ""}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "italic" : ""}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive("heading", { level: 1 }) ? "underline" : ""}
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive("paragraph") ? "underline" : ""}
                >
                    Paragraph
                </button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="border p-2" />


            {/* Image Upload */}
            <ImageUpload
                addImageToParentList={addImageToParentList}
            />

            {/* Return data */}
            <button onClick={handleSubmit}>
                Upload
            </button>
        </div>
    );
};
