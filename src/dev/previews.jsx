import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import {Log} from "../components/Log.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Log">
                <Log/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews